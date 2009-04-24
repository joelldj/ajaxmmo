class PostsController < ApplicationController
  include AuthenticatedSystem

  before_filter :login_required, :except => [:index, :show] 

	def ae_some_html(s)

		# replace < and > for &lt and &gt
		s.gsub('<','&lt;').gsub('>','&gt;')

		# replace allowed tags back to html
		# other tags: b, i, em, strong, u
		%w(b i em strong u p br span).each { |x|
		 s.gsub!(Regexp.new('&lt;(' + x + ')&gt;(.+?)&lt;/('+x+')&gt;',
			     Regexp::MULTILINE|Regexp::IGNORECASE), 
			     "<\\1>\\2</\\1>")
		}
	 
		s      
	end


  def login
    return unless request.post?
    self.current_user = User.authenticate(params[:login], params[:password])
    if logged_in?
      if params[:remember_me] == "1"
        self.current_user.remember_me
        cookies[:auth_token] = { :value => self.current_user.remember_token , :expires => self.current_user.remember_token_expires_at }
      end
      redirect_back_or_default(:controller => '/account', :action => 'index')
      flash[:notice] = "Logged in successfully"
    end
  end

  # GET /posts.xml
  def index
    @posts = Post.find(:all)

   	respond_to do |format|
     	   format.html # index.html.erb
      	   format.xml  { render :xml => @posts }
    	end
  end

  # GET /posts/1
  # GET /posts/1.xml
  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.xml
  def new
    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @post }
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
  end

  # POST /posts
  # POST /posts.xml
  def create
    @post = Post.new(params[:post])

    @post.author = current_user.login
    @post.user_id = current_user.id

		# this bit will escape some dodgy html that interferes with the main html of the site from the content of the post
		@post.content = ae_some_html(@post.content)

    respond_to do |format|
      if @post.save!
        flash[:notice] = 'Post was successfully created.'
        format.html { redirect_to(@post) }
        format.xml  { render :xml => @post, :status => :created, :location => @post }
      else
        flash[:notice] = 'The post did not save.'
        format.html { render :action => "new" }
        format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /posts/1
  # PUT /posts/1.xml
  def update
    @post = Post.find(params[:id])

		# this bit will escape some dodgy html that interferes with the main html of the site from the content of the post
		params[:post][:content] = ae_some_html(params[:post][:content])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        flash[:notice] = 'Post was successfully updated.'
        format.html { redirect_to(@post) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.xml
  def destroy
    @post = Post.find(params[:id])
	
		if @post.author == current_user.login
		  @post.destroy
		  respond_to do |format|
		    format.html { redirect_to(posts_url) }
		    format.xml  { head :ok }
		  end
		else
			flash[:notice] = 'Ahah you are not ' + @post.author + '!'
			redirect_to(:action => 'index')
                end
  end
end
