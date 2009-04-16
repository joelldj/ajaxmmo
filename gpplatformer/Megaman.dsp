# Microsoft Developer Studio Project File - Name="Megaman" - Package Owner=<4>
# Microsoft Developer Studio Generated Build File, Format Version 6.00
# ** DO NOT EDIT **

# TARGTYPE "Win32 (x86) External Target" 0x0106

CFG=Megaman - Win32 Debug
!MESSAGE This is not a valid makefile. To build this project using NMAKE,
!MESSAGE use the Export Makefile command and run
!MESSAGE 
!MESSAGE NMAKE /f "Megaman.mak".
!MESSAGE 
!MESSAGE You can specify a configuration when running NMAKE
!MESSAGE by defining the macro CFG on the command line. For example:
!MESSAGE 
!MESSAGE NMAKE /f "Megaman.mak" CFG="Megaman - Win32 Debug"
!MESSAGE 
!MESSAGE Possible choices for configuration are:
!MESSAGE 
!MESSAGE "Megaman - Win32 Release" (based on "Win32 (x86) External Target")
!MESSAGE "Megaman - Win32 Debug" (based on "Win32 (x86) External Target")
!MESSAGE 

# Begin Project
# PROP AllowPerConfigDependencies 0
# PROP Scc_ProjName ""
# PROP Scc_LocalPath ""

!IF  "$(CFG)" == "Megaman - Win32 Release"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 0
# PROP BASE Output_Dir "Release"
# PROP BASE Intermediate_Dir "Release"
# PROP BASE Cmd_Line "NMAKE /f Megaman.mak"
# PROP BASE Rebuild_Opt "/a"
# PROP BASE Target_File "Megaman.exe"
# PROP BASE Bsc_Name "Megaman.bsc"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 0
# PROP Output_Dir "Release"
# PROP Intermediate_Dir "Release"
# PROP Cmd_Line "NMAKE /f Megaman.mak"
# PROP Rebuild_Opt "/a"
# PROP Target_File "Megaman.exe"
# PROP Bsc_Name "Megaman.bsc"
# PROP Target_Dir ""

!ELSEIF  "$(CFG)" == "Megaman - Win32 Debug"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 1
# PROP BASE Output_Dir "Debug"
# PROP BASE Intermediate_Dir "Debug"
# PROP BASE Cmd_Line "NMAKE /f Megaman.mak"
# PROP BASE Rebuild_Opt "/a"
# PROP BASE Target_File "Megaman.exe"
# PROP BASE Bsc_Name "Megaman.bsc"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 1
# PROP Output_Dir "Debug"
# PROP Intermediate_Dir "Debug"
# PROP Cmd_Line "nmake /f "Megaman.mak""
# PROP Rebuild_Opt "/a"
# PROP Target_File "Megaman.exe"
# PROP Bsc_Name ""
# PROP Target_Dir ""

!ENDIF 

# Begin Target

# Name "Megaman - Win32 Release"
# Name "Megaman - Win32 Debug"

!IF  "$(CFG)" == "Megaman - Win32 Release"

!ELSEIF  "$(CFG)" == "Megaman - Win32 Debug"

!ENDIF 

# Begin Group "Source Files"

# PROP Default_Filter "cpp;c;cxx;rc;def;r;odl;idl;hpj;bat"
# Begin Source File

SOURCE=.\ai.c
# End Source File
# Begin Source File

SOURCE=.\BG.c
# End Source File
# Begin Source File

SOURCE=.\BGTILES.c
# End Source File
# Begin Source File

SOURCE=.\BOOM.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\character.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\collision.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\draw.c
# End Source File
# Begin Source File

SOURCE=.\ENEMIE.c
# End Source File
# Begin Source File

SOURCE=.\FIRE.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\gfx.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\gpmain.c
# End Source File
# Begin Source File

SOURCE=.\gunshot.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\load.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\map.c
# End Source File
# Begin Source File

SOURCE=.\map2.c
# End Source File
# Begin Source File

SOURCE=.\megaman.c
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\movement.c
# End Source File
# Begin Source File

SOURCE=.\ROCKMAN.c
# End Source File
# Begin Source File

SOURCE=.\RUNDOWN.c
# End Source File
# Begin Source File

SOURCE=.\RUNFWD.c
# End Source File
# Begin Source File

SOURCE=.\RUNUP.c
# End Source File
# Begin Source File

SOURCE=.\SONOROUS.c
# End Source File
# End Group
# Begin Group "Header Files"

# PROP Default_Filter "h;hpp;hxx;hm;inl"
# Begin Source File

SOURCE=.\ai.h
# End Source File
# Begin Source File

SOURCE=.\BG.H
# End Source File
# Begin Source File

SOURCE=.\BGTILES.H
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\character.h
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\collision.h
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\draw.h
# End Source File
# Begin Source File

SOURCE=.\enemie.H
# End Source File
# Begin Source File

SOURCE=.\fire.h
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\gfx.h
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\gpmain.h
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\load.h
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\map.h
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\movement.h
# End Source File
# Begin Source File

SOURCE=.\rockman.h
# End Source File
# Begin Source File

SOURCE=.\rundown.h
# End Source File
# Begin Source File

SOURCE=.\runfwd.h
# End Source File
# Begin Source File

SOURCE=.\runup.h
# End Source File
# Begin Source File

SOURCE=.\sound.H
# End Source File
# Begin Source File

SOURCE=..\..\..\..\devkitadv\mario\title.h
# End Source File
# End Group
# Begin Group "Resource Files"

# PROP Default_Filter "ico;cur;bmp;dlg;rc2;rct;bin;rgs;gif;jpg;jpeg;jpe"
# Begin Source File

SOURCE=.\Makefile
# End Source File
# End Group
# End Target
# End Project
