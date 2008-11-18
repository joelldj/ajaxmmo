using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

/// <summary>
/// Summary description for character
/// </summary>
/// 
namespace MMO
{
    public class character : iEntity 
    {
        string _owner; // username
        int _x;
        int _y;
        int _hp;
        int _stamina;
        int _mana;
        int _tile_on; // tile character is situated on.
        string _name;
        int _id;

        bool isdirty;

        public bool IsDirty
        {
            get { return isdirty; }
            set { isdirty = value; }
        }

        public int id
        {
            get { return _id; }
            set { _id = value; isdirty = true; }
        }

        public string owner
        {
            get { return _owner; }
            set { _owner = value; isdirty = true; }
        }

        public int x
        {
            get { return _x; }
            set { _x = value; isdirty = true; }
        }

        public int y
        {
            get { return _y; }
            set { _y = value; isdirty = true; }
        }

        public int hp
        {
            get { return _hp; }
            set { _hp = value; isdirty = true; }
        }

        public int stamina
        {
            get { return _stamina; }
            set { _stamina = value; isdirty = true; }
        }

        public int mana
        {
            get { return _mana; }
            set { _mana = value; isdirty = true; }
        }

        public int tile_on
        {
            get { return _tile_on; }
            set { _tile_on = value; isdirty = true; }
        }

        public string name
        {
            get { return _name; }
            set { _name = value; isdirty = true; }
        }

        public character()
        {
            //
            // TODO: Add constructor logic here
            //
        }


    }
}
