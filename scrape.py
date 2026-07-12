import urllib.request
import json
import os

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
    print(f"Found {len(edges)} posts.")
    
    os.makedirs('public/assets/otf', exist_ok=True)
    
    downloaded = []
    
    for i, edge in enumerate(edges[:12]):
        node = edge['node']
        img_url = node['display_url']
        filename = f"insta_{i+1}.jpg"
        filepath = os.path.join('public/assets/otf', filename)
        
        print(f"Downloading {filename}...")
        urllib.request.urlretrieve(img_url, filepath)
        downloaded.append(filename)
        
    print("Download complete.", downloaded)
        
except Exception as e:
    print('Error:', e)
