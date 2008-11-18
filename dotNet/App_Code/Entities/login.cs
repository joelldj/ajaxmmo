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
/// Summary description for login
/// </summary>
/// 
namespace MMO
{
    public class login
    {
        string _loginName;
        int _loginID;

        public string loginName
        {
            get { return _loginName; }
            set { _loginName = value; }
        }

        public int loginID
        {
            get { return _loginID; }
            set { _loginID = value; }
        }

        public login()
        {
            //
            // TODO: Add constructor logic here
            //
        }
    }
}