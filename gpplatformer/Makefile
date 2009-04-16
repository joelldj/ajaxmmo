# devkitadv base dir
export CCBASE=c:/devkitadv
# User options passed to the compiler
export CUSER=-DLITTLE_ENDIAN -DGP32
include $(CCBASE)/gp32.mk
#------------------------------

all: gpmain.gxb

gpmain.gxb: gpmain.elf
gpmain.elf: gpmain.o gfx.o draw.o character.o collision.o movement.o map.o map2.o load.o bgtiles.o bg.o rockman.o fire.o rundown.o runup.o runfwd.o megaman.o enemie.o ai.o sound.o gunshot.o boom.o sonorous.o libmodplay.a
	$(LINK)

gpmain.o: gpmain.c
gfx.o: gfx.c
draw.o: draw.c
character.o: character.c
collision.o: collision.c
movement.o: movement.c
map.o: map.c
map2.o: map2.c
load.o: load.c
bgtiles.o: bgtiles.c
bg.o: bg.c
rockman.o: rockman.c
fire.o: fire.c

megaman.o: megaman.c
rundown.o: rundown.c
runup.o: runup.c
runfwd.o: runfwd.c

enemie.o: enemie.c
ai.o: ai.c

sound.o: sound.c
gunshot.o: gunshot.c
sonorous.o: sonorous.c
boom.o: boom.c


clean:
	del gpmain.gxb gpmain.elf gpmain.o gfx.o draw.o character.o movement.o map.o map2.o load.o bgtiles.o bg.o rockman.o fire.o megaman.o ai.o enemie.o rundown.o runup.o runfwd.o 

