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
using System.Collections.Generic;
using System.Web.Script.Serialization;
using MMO;

namespace MMO
{
    public class TileDB : iDb
    {
        List<MMO.Tile> Tiles;
        MMO.db db1;
        JavaScriptSerializer serializer = new JavaScriptSerializer();

        public TileDB(int characterid) /* Constructor for Tiles around usernames character */
        {
            db1 = new MMO.db();
            Tiles = new List<MMO.Tile>();

            db1.SetCommand("s_TilesGet", CommandType.StoredProcedure);
            db1.AddParam<int>("characterid", SqlDbType.Int, 4, characterid);

            db1.Read();

            // access the datareader within the class
            while (db1.dr.Read())
            {
                AddTile(Int32.Parse(db1.dr["id"].ToString()),
                    Int32.Parse(db1.dr["x"].ToString()),
                    Int32.Parse(db1.dr["y"].ToString()),
                    Int32.Parse(db1.dr["tile_type_id"].ToString())
                );

            }
        }

        public TileDB() { 
            Tiles = new List<MMO.Tile>();
            db1 = new MMO.db();
        
        } /* Contructor for Blank data */

        public bool AddTile(int id, int x, int y, int tile_type_id)
        {
            try
            {
                Tiles.Add(
                                new Tile(
                                    // if -1 when saved tile will be inserted rather than updated
                                    // the object's id will then be updated to the id in the db.
                                    id, 
                                    x,
                                    y,
                                    tile_type_id
                                )
                           );
                return true;
            } catch {
                return false;            
            }
        }

        public void SaveAll()
        {
                Tiles.ForEach(Save);
        }

        public void Save(object o)
        {
            Tile t = (Tile)o;

            if (t.IsDirty)
            {

                // save dirt to database
                db1 = new MMO.db();
                db1.SetCommand("s_SaveTile", CommandType.StoredProcedure);
                db1.AddParam<int>("id", SqlDbType.Int, 4, t.Id);
                db1.AddParam<int>("x", SqlDbType.Int, 4, t.X);
                db1.AddParam<int>("y", SqlDbType.Int, 4, t.Y);
                db1.AddParam<int>("tile_type_id", SqlDbType.Int, 4, t.Tile_Type_Id);

                // return value of runscalar is the new or old id of tile
                t.Id = Int32.Parse(db1.RunScalar().ToString());

                // no dirt to save
                t.IsDirty = false;
            }
        }

        public List<MMO.Tile> ListOfTiles
        {
            get { return Tiles; }
            set { Tiles = value; }
        }

        public string StringOfTiles
        {
            get { return serializer.Serialize(Tiles); }
        }
    }
}