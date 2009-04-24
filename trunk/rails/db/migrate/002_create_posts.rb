class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.string :author
      t.datetime :created_at
      t.datetime :modified_at
      t.timestamps
      t.integer :user_id
    end
  end

  def self.down
    drop_table :posts
  end
end
