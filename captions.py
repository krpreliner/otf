import urllib.request
import json

url = 'https://www.instagram.com/api/v1/users/web_profile_info/?username=weotfacademy'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'X-IG-App-ID': '936619743392459',
})

try:
    response = urllib.request.urlopen(req).read().decode('utf-8')
    data = json.loads(response)
    user = data['data']['user']
    
    edges = user['edge_owner_to_timeline_media']['edges']
    
    for i, edge in enumerate(edges[:12]):
        node = edge['node']
        captions = node.get('edge_media_to_caption', {}).get('edges', [])
        caption_text = captions[0]['node']['text'] if captions else "No caption"
        clean_caption = caption_text[:100].replace(chr(10), ' ').encode('ascii', 'ignore').decode('ascii')
        print(f"insta_{i+1}.jpg Caption: {clean_caption}")
        
except Exception as e:
    print('Error:', e)
