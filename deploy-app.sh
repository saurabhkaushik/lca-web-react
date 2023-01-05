#docker build -t lca-web-react .

#docker run -d -it –rm -p [host_port]:[container_port] –name [container_name] [image_id/image_tag]
#docker run -p 8080:3000 -it lca-web-react 

gcloud config set account 'lcakumar002@gmail.com'
gcloud config set project 'lca-prod-372208'

gcloud run deploy lca-web-react --region asia-south1 --source .