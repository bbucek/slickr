class Image < ApplicationRecord
  mount_uploader :attachment, ImageUploader
end
