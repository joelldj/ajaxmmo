<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    

<script src="jquery-1.2.6.min.js" type="text/javascript"></script>    
<script src="jquery-rounded.js" type="text/javascript"></script>
<script src="default.js" type="text/javascript"></script>
    
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Label ID="lblLogin" runat="server" />
    
        <asp:Login ID="Login1" runat="server" Visible="False">
        </asp:Login>
        <asp:LinkButton ID="LoginButton" runat="server" OnClick="LinkButton1_Click">Login</asp:LinkButton>

        <asp:CreateUserWizard ID="CreateUserWizard1" runat="server" Visible="False">
            <WizardSteps>
                <asp:CreateUserWizardStep runat="server" />
                <asp:CompleteWizardStep runat="server" />
            </WizardSteps>
        </asp:CreateUserWizard>
        <asp:LinkButton ID="RegisterButton" runat="server" OnClick="LinkButton2_Click">Register</asp:LinkButton>
        
        <div id="jsGrid"></div>
        
    </div>
    </form>
</body>
</html>
