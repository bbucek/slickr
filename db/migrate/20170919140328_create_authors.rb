class CreateAuthors < ActiveRecord::Migration[5.1]
  def change
    create_table :authors do |t|
      t.string :name
      t.string :email
      t.string :local_authority
      t.string :age_groups, array: true
      t.boolean :ll_funded, default: false
      t.boolean :braw_network, default: false
      t.string :author_type, array: true
      t.string :languages, array: true
      t.text :bio
      t.string :photo

      t.timestamps
    end
  end
end
