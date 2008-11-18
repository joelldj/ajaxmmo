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
using MMO;

/// <summary>
/// Summary description for loginDB
/// </summary>
/// 
namespace MMO
{
    public class loginDB
    {
        MMO.login user;

        public loginDB(string username)
        {
            user = new MMO.login();
            user.loginID = GetLoginID(username);
            user.loginName = username;
        }

        private int GetLoginID(string username)
        {
            MMO.db db1 = new db();

            /* if not exist, create and then return id */
            db1.SetCommand("s_LoginIDGet", CommandType.StoredProcedure);
            db1.AddParam<string>("Login", SqlDbType.NVarChar, 50, username);

            return Int32.Parse(db1.RunScalar().ToString());
        }

        public MMO.login GetUser()
        {
            return user;
        }
    }
}
