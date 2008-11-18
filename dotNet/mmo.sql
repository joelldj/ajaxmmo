SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LoginUser]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[LoginUser] (
	@username nvarchar(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	if (select count(*) from dbo.users where username = @username) < 0
	begin
		insert into dbo.users 
			(username, enabled, creationdate, lastlogin, currentcharacter)
				values
			(@username, 1, getdate(), getdate(), 0)
	end
	else
		update dbo.users set lastlogin = getdate()

END
' 
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[s_TileGet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[s_TileGet]
( 
	@x int, @y int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT id from mmotiles where x = @x and y = @y
END
' 
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[s_SaveTile]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[s_SaveTile]
(
	@id int,
	@x int,
	@y int,
	@tile_type_id int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

if @id = -1
begin
	insert into mmotiles
		( x, y, tile_type_id )
	values
		( @x, @y, @tile_type_id )

	select @@identity
end
else
begin
	update mmotiles
		set 
			x = @x,
			y = @y,
			tile_type_id = @tile_type_id
	where 
		id = @id

	select @id
end

END
' 
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[s_LoginIDGet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[s_LoginIDGet]
(
	@Login nvarchar(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT id from users where username = @login
END
' 
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[s_CharactersGet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[s_CharactersGet]
(
	@LoginID int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT [id]
      ,[login]
      ,[charactername]
      ,[charactertype]
      ,[hp]
      ,[stamina]
      ,[mana]
      ,[x]
      ,[y]
  FROM [MMOTECH1].[dbo].[characters]
WHERE
	login = @loginid

END
' 
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[enabled] [bit] NOT NULL,
	[creationdate] [datetime] NULL,
	[lastlogin] [datetime] NULL,
	[currentcharacter] [int] NOT NULL
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[typetile]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[typetile](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [nvarchar](50) NOT NULL,
	[height] [int] NOT NULL,
	[imageurl] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[mmotiles]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[mmotiles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[x] [int] NOT NULL,
	[y] [int] NOT NULL,
	[tile_type_id] [int] NOT NULL
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[characters]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[characters](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[login] [int] NOT NULL,
	[charactername] [nvarchar](50) NOT NULL,
	[charactertype] [int] NOT NULL,
	[hp] [int] NOT NULL,
	[stamina] [int] NOT NULL,
	[mana] [int] NOT NULL,
	[x] [int] NOT NULL,
	[y] [int] NOT NULL
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[s_TilesGet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[s_TilesGet]
(
   @characterid int
)
AS
BEGIN

	DECLARE @x int, @y int, @span int;
	SET NOCOUNT ON;

	SELECT @span = 3

    SELECT @x=x, @y=y FROM dbo.characters where id = @characterid
 
    -- Insert statements for procedure here
	SELECT id, x, y, tile_type_id FROM MMOTILES
	WHERE
		((x <= (@x - @span)) OR (x <= (@x + @span)))
		AND
		((y <= (@y - @span)) OR (y <= (@y + @span)))
	ORDER BY x, y
END




' 
END
