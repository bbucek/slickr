class AddAasmStateToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :aasm_state, :string
  end
end
