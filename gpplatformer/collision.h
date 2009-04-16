#ifndef _COLLISION_H
#define _COLLISION_H


// COLLISION



int testsquares ( struct rect, struct player);
int testbelow ( struct rect, struct player, int);
int testbox ( struct box, struct box);
int bullettest ( struct str_effect, struct player);


#endif