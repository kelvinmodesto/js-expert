echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Monkey D. Luffy", "age": "19"}' #correct!

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "Kousuki Momonosuke", "age": "8"}' 

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "Gon", "age": "19"}'

echo $'\n\n[requesting: all invalid]'
curl -i localhost:3000 -X POST --data '{"name": "Gon", "age": "11"}'

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "D"}' 