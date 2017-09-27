class AddPublishingOptionsToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :published_at, :datetime
    add_column :pages, :publishing_scheduled_for, :datetime
  end
end
