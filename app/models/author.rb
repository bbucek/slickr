class Author < ApplicationRecord
  mount_uploader :image, AuthorUploader
  def display_title
    name
  end
end
