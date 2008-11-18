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
 
namespace MMO {
    // This is the class that will be serialized.
    public class Tile : iEntity
    {
        int id;
        int x;
        int y;
        int tile_type_id;

        bool isdirty;
        
        public int Id
        {
            get { return this.id; }
            set { this.id = value; isdirty = true; }
        }

        public int X
        {
            get { return this.x; }
            set { this.x = value; isdirty = true; }
        }

        public int Y 
        {
            get { return this.y; }
            set { this.y = value; isdirty = true; }
        }

        public int Tile_Type_Id
        {
            get { return this.tile_type_id; }
            set { this.tile_type_id = value; isdirty = true; }
        }

        public bool IsDirty
        {
            get { return isdirty; }
            set { isdirty = value; }
        }

        public Tile() 
        {
            // empty new tile is not dirty
            isdirty = false;
        }

        public Tile(int id, int x, int y, int tile_type_id)
        {
            this.id = id;
            this.x = x;
            this.y = y;
            this.tile_type_id = tile_type_id;
            
            // unsaved tile is dirty
            isdirty = true;
        }
    }
}
