# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Ranking.destroy_all

@user = User.create!(username: 'admin', email: 'tyler@gameset.blog', password: 'DD_vZtHFB8-c')
@rapidAPIUser = User.create!(username: 'rapidAPI', email: 'hello@gameset.blog', password: 'U!XGCK3mnt*!Lz2z')
@rankings = Ranking.create!(data: 'none', date: "2021-05-24")

puts "#{User.count} users created"
puts "#{Ranking.count} rankings created"