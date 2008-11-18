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
using System.Data.Sql;
using System.Data.SqlClient;

namespace MMO
{
    public class db
    {
        SqlConnection dbC;
        public SqlCommand cmd;
        public SqlDataReader dr;

        public db()
        {
            dbC = new SqlConnection(ConfigurationManager.AppSettings["ConnectionString"]);
            dbC.Open();
        }

        public int SetCommand(string CommandName, CommandType type)
        {
            try
            {
                cmd = new SqlCommand(CommandName, dbC);
                cmd.CommandType = type;
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public int AddParam<T>(string name, SqlDbType type, int ParamSize, T value)
        {
            try
            {
                cmd.Parameters.Add(name, type, ParamSize).Value = value;
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public bool Read()
        {
            try
            {
                dr = cmd.ExecuteReader();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public object RunScalar()
        {
            return cmd.ExecuteScalar();
        }

        public bool RunNoQuery()
        {
            try
            {
                cmd.ExecuteNonQuery();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
