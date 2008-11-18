using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Text;

using MMO;

public partial class _Default : System.Web.UI.Page
{
    public List<MMO.Tile> Tiles;
    public MMO.character chr;

    protected void Page_Load(object sender, EventArgs e)
    {
        lblLogin.Text = Page.User.Identity.Name;
    }

    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        Login1.Visible = true;
        RegisterButton.Visible = true;
        LoginButton.Visible = false;
    }
    protected void LinkButton2_Click(object sender, EventArgs e)
    {
        CreateUserWizard1.Visible = true;
        RegisterButton.Visible = false;
        LoginButton.Visible = true;
    }
}
