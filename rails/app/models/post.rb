class Post < ActiveRecord::Base
   belongs_to :user, :foreign_key => 'user_id'
   validates_presence_of :user_id
end
