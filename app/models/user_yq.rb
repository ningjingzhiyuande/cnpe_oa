class UserYq < ActiveRecord::Base
  establish_connection :yanqing
  self.table_name = 'users'
end
