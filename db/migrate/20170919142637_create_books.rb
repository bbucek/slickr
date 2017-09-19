class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.references :author, foreign_key: true
      t.string :title
      t.string :synopsis
      t.string :publisher
      t.string :publishing_year
      t.string :isbn

      t.timestamps
    end
  end
end
