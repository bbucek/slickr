class Page < ApplicationRecord
  extend FriendlyId
  has_ancestry
  friendly_id :title, use: :slugged
end
