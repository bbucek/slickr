class AddImagesToBooksAndAuthors < ActiveRecord::Migration[5.1]
  def change
    add_column :authors, :image, :string
    add_column :books, :image, :string
  end
end
