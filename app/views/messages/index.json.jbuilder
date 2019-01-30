if @new_message.present?
  json.array! @new_message do |message|
    json.message  message.message
    json.image  message.image.url
    json.user_id  message.user.id
    json.user_name message.user.name
    json.time  message.created_at.strftime('%Y/%m/%d %H:%M')
    json.id message.id
  end
end
