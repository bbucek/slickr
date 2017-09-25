class Book < ApplicationRecord
  mount_uploader :image, CoverUploader
  belongs_to :author
  validates :isbn, presence: true
end
