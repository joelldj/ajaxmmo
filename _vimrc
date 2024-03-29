" My vim settings file
" Author: Mskadu <mskadu@gmail.com>
" Last updated: 12/Dec/2008

" Settings {{{
set secure nocompatible
if version >= 600
  syntax enable

  if version >= 700
    filetype plugin indent on
  else
    filetype on
    filetype plugin on
    filetype indent on
  endif
else
  :finish
endif
" }}}

" }}}

" General Settings {{{
"
"Make autoindent happen
set autoindent
"Show actual cursor position
set ruler
set showcmd
set showmatch
set showmode

"Misc
set backspace=indent,eol,start
set formatoptions=croq
set number
set shiftwidth=2
set smartindent
set tabstop=2
set expandtab

" *always* use Unicode
set encoding=utf-8 fileencodings=

"Fix findstr for Win32
if has("win32")
  set grepprg=findstr\ /R\ /S\ /N
endif

" Choose right syntax highlighting with tab completion
map <F2> :source $VIMRUNTIME/syntax/
" F9 toggles highlighting
map <F9> :if has("syntax_items")<CR>syntax off<CR>else<CR>syntax on<CR>endif<CR><CR>

"Vim 7 specific mappings
if version >= 700
  map <C-t> <Esc>:tabnew<CR>
  map <C-F4> <Esc>:tabclose<CR> 
  map <C-a> <Esc>ggVG 
endif

"Windows like mappings
if has("win32")
  "Ctrl+A = Select All
  map <C-a> <Esc>ggVG 
  "Ctrl+tab = Fwd Cycle across splits
  map <C-Tab> <Esc><C-w>w
  "Ctrl+Shift+tab = Reverse Cycle across splits
  map <C-S-Tab> <Esc><C-w>W
endif

" show status line
set ls=2
"Make no *.bak
set nobackup
" keep backup while we are editing
set writebackup
"Do not wrap text
set nowrap
" do not highlight searches
set nohlsearch
"Turn this ON when we want to debug
"set verbose=9

"General Options ends }}}

"Java settings {{{
let java_highlight_functions=1

if has("autocmd")
  autocmd BufRead,BufNewFile *.java set makeprg=javac\ %
  "autocmd BufRead BufNewFile *.java set makeprg=ant\ -emacs

  " Mark Klips as XML files (17/2/2005)
  autocmd BufRead,BufNewFile *.klip set filetype=xml

  " Mark Mycroft Source as XML files (17/2/2005)
  autocmd BufRead,BufNewFile *.src set filetype=xml

  " Reload settings file everytime its written 
  autocmd! bufwritepost _vimrc source $VIM/_vimrc

  " Shameless stolen from vimrc_example. I like this!

  " When editing a file, always jump to the last known cursor position.
  " Don't do it when the position is invalid or when inside an event handler
  " (happens when dropping a file on gvim).
  autocmd BufReadPost *
        \ if line("'\"") > 0 && line("'\"") <= line("$") |
        \   exe "normal! g`\"" |
        \ endif

endif
"Java Settings End }}}

"My color settings {{{
"
"Reset the default ones before we begin loading ours
highlight Constant  NONE
highlight Delimiter NONE
highlight Directory   NONE
highlight Error   NONE
highlight ErrorMsg  NONE
highlight Identifier  NONE
highlight LineNr    NONE
highlight ModeMsg   NONE
highlight MoreMsg   NONE
highlight NonText   NONE
highlight Normal    NONE
highlight PreProc   NONE
highlight Question  NONE
highlight Search    NONE
highlight Special   NONE
highlight SpecialKey  NONE
highlight Statement NONE
highlight StatusLine  NONE
highlight Title   NONE
highlight Todo      NONE
highlight Type      NONE
highlight Visual    NONE
highlight WarningMsg  NONE

"Now put in our own colors
highlight Comment   term=bold ctermfg=5 ctermbg=0 guifg=#FF005F guibg=gray
highlight Constant  term=underline ctermfg=6 guifg=#FF2F8F
highlight Delimiter   term=bold cterm=bold ctermfg=1 gui=bold guifg=red
highlight Directory term=bold ctermfg=DarkBlue guifg=Blue
highlight Error   term=standout cterm=bold ctermbg=1 ctermfg=1 gui=bold guifg=red
highlight ErrorMsg  term=standout cterm=bold ctermfg=1 gui=bold guifg=red
highlight Identifier  term=underline ctermfg=3 guifg=Yellow3
highlight LineNr    term=underline cterm=bold ctermfg=3 guifg=Brown
highlight ModeMsg   term=bold cterm=bold ctermfg=3 ctermbg=1 guifg=yellow2 guibg=red
highlight MoreMsg   term=bold cterm=bold ctermfg=2 gui=bold guifg=green
highlight NonText   term=bold ctermfg=2 guifg=green3
highlight Normal    ctermfg=white ctermbg=black guifg=grey90 guibg=#000020
highlight PreProc   term=underline ctermfg=14 guifg=cyan
highlight Question  term=standout cterm=bold ctermfg=2 gui=bold guifg=Green
highlight Search    term=reverse ctermbg=2 guibg=Yellow
highlight Special   term=bold ctermfg=5 guifg=SlateBlue
highlight SpecialKey  term=bold ctermfg=DarkBlue guifg=Blue

set foldmethod=syntax
colorscheme darkblue

"use our custom font
if has("gui") 
  set guifont=Courier_New:h10:cANSI

  "see: http://vim.wikia.com/wiki/VimTip1
  set mousemodel=extend
endif

" Custom Commands
command! DiffOrig vert new | set bt=nofile | r # | 0d_ | diffthis
    \ | wincmd p | diffthis

"highlight current line
set cursorline
":hi CursorLine term=none cterm=none ctermbg=3
":autocmd InsertLeave * hi CursorLine term=none cterm=none ctermbg=3
":autocmd InsertEnter * hi CursorLine term=none cterm=none ctermbg=4

"the main keystrokes that put you into insert mode
noremap i :colorscheme desert<cr>i
noremap o :colorscheme desert<cr>o
noremap s :colorscheme desert<cr>s
noremap a :colorscheme desert<cr>a
noremap I :colorscheme desert<cr>I
noremap O :colorscheme desert<cr>O
noremap S :colorscheme desert<cr>S
noremap A :colorscheme desert<cr>A

"You need the next line to change the color back when you hit escape.
inoremap <Esc> <Esc>:colorscheme darkblue<cr>

vmap <C-c> y<Esc>i
vmap <C-x> d<Esc>i
imap <C-v> <Esc>pi
imap <C-y> <Esc>ddi
map <C-z> <Esc>
imap <C-z> <Esc>ui

