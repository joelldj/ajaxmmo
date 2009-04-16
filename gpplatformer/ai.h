#ifndef MOVEMENT_H
#define MOVEMENT_H

void move_enemie(void);

// subfunction called from ai.c
void enemie_collisions(int);
void enemie_script(int);
void shoot_enemie_bullets(void);

#endif /*__gpmain_h__*/