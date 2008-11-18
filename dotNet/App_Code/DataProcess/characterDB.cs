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
using MMO;

/// <summary>
/// Summary description for characterDB
/// </summary>
/// 
namespace MMO
{
    public class characterDB
    {
        List<MMO.character> list = new List<character>();

        MMO.login owner;

        public characterDB(string username)
        {
            MMO.loginDB ldb1 = new loginDB(username);
            owner = ldb1.GetUser();

            List<MMO.character> list = new List<character>();

            GetCharacters();
        }

        public List<character> GetCharacters()
        {
            db db1 = new db();

            db1.SetCommand("s_CharactersGet", CommandType.StoredProcedure);
            db1.AddParam<int>("LoginID", SqlDbType.Int, 4, owner.loginID);

            db1.Read();

            // access the datareader within the class
            while (db1.dr.Read())
            {
                character chr1 = new character();

                chr1.id = Int32.Parse(db1.dr["id"].ToString());
                chr1.hp = Int32.Parse(db1.dr["hp"].ToString());
                chr1.mana = Int32.Parse(db1.dr["mana"].ToString()); 
                chr1.owner = owner.loginName;
                chr1.stamina = Int32.Parse(db1.dr["stamina"].ToString());
                //chr1.tile_on = Int32.Parse(db1.dr["tile_on"].ToString());
                chr1.x = Int32.Parse(db1.dr["x"].ToString());
                chr1.y = Int32.Parse(db1.dr["y"].ToString());
                chr1.name = db1.dr["charactername"].ToString();

                list.Add(
                    chr1
                );
            }

            return list;
        }

        public void Save(object o)
        {
            db db1 = new db();
            character t = (character)o;

            if (t.IsDirty)
            {
                // save dirt to database
                db1 = new MMO.db();
                db1.SetCommand("s_SaveCharacter", CommandType.StoredProcedure);
                db1.AddParam<int>("id", SqlDbType.Int, 4, t.id);
                db1.AddParam<int>("login", SqlDbType.Int, 4, owner.loginID);
                db1.AddParam<string>("charactername", SqlDbType.VarChar, 50, t.name);
                db1.AddParam<int>("charactertype", SqlDbType.Int, 4, 0);
                db1.AddParam<int>("hp", SqlDbType.Int, 4, t.hp);
                db1.AddParam<int>("stamina", SqlDbType.Int, 4, t.stamina);
                db1.AddParam<int>("mana", SqlDbType.Int, 4, t.mana);
                db1.AddParam<int>("x", SqlDbType.Int, 4, t.x);
                db1.AddParam<int>("y", SqlDbType.Int, 4, t.y);

                // return value of runscalar is the new or old id of tile
                t.id = Int32.Parse(db1.RunScalar().ToString());

                // no dirt to save
                t.IsDirty = false;
            }
        }
    }
}
