"""API для комментариев к видео. Хранит комментарии всех пользователей в БД."""
import json
import os
import psycopg2

SCHEMA = "t_p243053_russian_youtube_clon"
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    # GET /comments?video_id=v1
    if method == "GET":
        video_id = params.get("video_id", "")
        if not video_id:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "video_id required"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""SELECT id, video_id, author, author_color, text, likes,
                       to_char(created_at AT TIME ZONE 'Europe/Moscow', 'DD.MM.YYYY HH24:MI') as date
                FROM {SCHEMA}.comments
                WHERE video_id = %s
                ORDER BY created_at DESC
                LIMIT 100""",
            (video_id,)
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        comments = [
            {"id": str(r[0]), "videoId": r[1], "author": r[2], "authorColor": r[3],
             "text": r[4], "likes": r[5], "date": r[6]}
            for r in rows
        ]
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"comments": comments})}

    # POST /comments — добавить комментарий
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        video_id = body.get("video_id", "").strip()
        text = body.get("text", "").strip()
        author = body.get("author", "Гость").strip() or "Гость"
        author_color = body.get("author_color", "#4A90D9")

        if not video_id or not text:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "video_id and text required"})}
        if len(text) > 2000:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "text too long"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""INSERT INTO {SCHEMA}.comments (video_id, author, author_color, text)
                VALUES (%s, %s, %s, %s)
                RETURNING id, to_char(created_at AT TIME ZONE 'Europe/Moscow', 'DD.MM.YYYY HH24:MI')""",
            (video_id, author[:100], author_color, text)
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        comment = {
            "id": str(row[0]), "videoId": video_id, "author": author,
            "authorColor": author_color, "text": text, "likes": 0, "date": row[1]
        }
        return {"statusCode": 201, "headers": CORS, "body": json.dumps({"comment": comment})}

    # POST /comments/like?id=123
    if method == "PATCH":
        body = json.loads(event.get("body") or "{}")
        comment_id = body.get("id")
        if not comment_id:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "id required"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.comments SET likes = likes + 1 WHERE id = %s RETURNING likes",
            (comment_id,)
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if not row:
            return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "not found"})}
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"likes": row[0]})}

    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "method not allowed"})}
