#ifndef MOVEMENT_H
#define MOVEMENT_H

void move_blocky(void);
void move_bullets(void);
void shoot_bullets(void);
void explosions_start(int);

extern struct str_effect bullets[10];
extern struct str_effect explosion[10];
extern struct str_effect heroexplosion;


#endif /*__gpmain_h__*/