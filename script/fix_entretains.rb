# run by: rails runner script/fix_entretains.rb | tee log/fix_yanqing.log
require 'date'
error_ids = []
no_user_ids = []
no_reporter_ids = []
Entretain.find_each do |e|
  # 修复之前的数据
  #| id  | user_id | reporter_id | title    | num                    | created_at          | updated_at          |
  #+-----+---------+-------------+----------+------------------------+---------------------+---------------------+
  #| 887 |     545 |          13 | 田湾56   | 宴请-2015-11-06-1574   | 2015-11-06 11:02:01 | 2015-11-09 00:46:39 |
  next if e.id > 887

  begin
    yq_user = UserYq.find(e.user_id)
    yq_reporter = UserYq.find(e.reporter_id)
    unless user = User.where(email: yq_user.email).first
      no_user_ids << "no user for email: #{yq_user.email} yq user_id=#{yq_user.id}"
    end
    unless reporter = User.where(email: yq_reporter.email).first
      no_reporter_ids << "no new user for email: #{yq_reporter.email} yq user_id=#{yq_reporter.id}"
    end
    #e.update_attributes(user_id: user.id, reporter_id: reporter.id)
    puts "==>fixed: #{e.id} user_id: #{e.user_id} --> #{user.try(:id)}, reporter_id: #{e.reporter_id} -->#{reporter.id}  "
  rescue =>err
    error_ids << e.id
  end
end
puts "====error ids:"
puts error_ids.join(' ')
puts "====no user ids:"
puts no_user_ids
puts "====no reporter ids:"
puts no_reporter_ids
puts '==end...'
