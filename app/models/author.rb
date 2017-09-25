class Author < ApplicationRecord
  mount_uploader :image, AuthorUploader
end
