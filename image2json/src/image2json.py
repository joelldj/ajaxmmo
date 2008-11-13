from PIL import Image

im = Image.open("genesis.png")
#im.mode = "L"
pix = im.load()

size = im.size

firstnode = True
id = 0
json = ""

f=open('terrain.json', 'a')

for x in range(0, size[0]):
   for y in range(0, size[1]):
       id = id + 1
       if firstnode == False:
           json = json + ","
       json = json + "{"
       json = json + "x:'" + str(x) + "',"
       json = json + "y:'" + str(y) + "',"
       json = json + "height:" + str(pix[x,y]) + "',"
       json = json + "id:'" + str(id) + "'"
       json = json + "}"
       firstnode = False
       f.write(json)

    
