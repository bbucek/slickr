class ChangePageTreeStructure < ActiveRecord::Migration[5.1]
  def change
    remove_column :pages, :ancestry
    add_column :pages, :parent_id, :integer
    add_index :pages, :parent_id
    add_column :pages, :position, :integer
  end
end
