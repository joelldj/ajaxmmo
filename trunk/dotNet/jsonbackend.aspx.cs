using System;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Data.SqlClient;
using MMO;

public partial class _Default : System.Web.UI.Page 
{
    public List<MMO.Tile> Tiles;
    public MMO.character chr;

    protected void Page_Load(object sender, EventArgs e)
    {
        getUserCharacter();
        LoadTiles();

        if (Request["id"] != null)
        {
            Clicked_TileID = Int32.Parse(Request["id"]);
            if (Clicked_TileID > 0)
            {
                MoveCharacterTowardsTile(Clicked_TileID);
            }
        }

        if (Request["GetMap"] != null)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            Response.Write(js.Serialize(Tiles));     
        }
    }

    protected void LoadTiles()
    {
        TileDB tdb = new TileDB(chr.id);

        Tiles = tdb.ListOfTiles;
    }

    enum e_xdirection { none = 0, down = 1, up = -1 };
    enum e_ydirection { none = 0, left = -1, right = 1 };

    private int Clicked_TileID;
    public bool FindID(Tile s)
    {
        if (s.Id == Clicked_TileID)
        {
            return true;
        } else {
            return false;
        }
    }

    protected void MoveCharacterTowardsTile(int Clicked_TileID)
    {
        e_xdirection xdirection = e_xdirection.none;
        e_ydirection ydirection = e_ydirection.none;

        MMO.Tile itemTile = Tiles.Find(FindID);

        if (itemTile.X > chr.x)
        {
            xdirection = e_xdirection.down;
        }
        else
        {
            if (itemTile.X < chr.x)
            {
                xdirection = e_xdirection.up;
            }
        }

        if (itemTile.Y > chr.y)
        {
            ydirection = e_ydirection.right;
        }
        else
        {
            if (itemTile.Y < chr.y)
            {
                ydirection = e_ydirection.left;
            }
        }

        if (!((ydirection == e_ydirection.none) && (xdirection == e_xdirection.none)))
        {
            chr.y += (int)ydirection;
            chr.x += (int)xdirection;

            characterDB db = new characterDB("joseph");
            db.Save(chr);

            getUserCharacter();
            LoadTiles();
        }
    }

    // belongs in characterDB
    protected void getUserCharacter()
    {
        MMO.characterDB chrDB = new characterDB("joseph");
        chr = chrDB.GetCharacters().First();
    }
}
