class AddAvatarToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :admin_users, :avatar, :string
  end
end
