# Steven Buccini, Nikita Kouevda, Eddie Lee
# 2012/10/02

# Remove former contents and load quotes.json into the Box database
mongoimport --drop -d Box -c quotes quotes.json
