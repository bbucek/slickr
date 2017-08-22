class CreatePages < ActiveRecord::Migration[5.1]
  def change
    create_table :pages do |t|
      t.string :title
      t.string :slug
      t.string :ancestry

      t.timestamps
    end
    add_index :pages, :slug, unique: true
    add_index :pages, :ancestry
  end
end
