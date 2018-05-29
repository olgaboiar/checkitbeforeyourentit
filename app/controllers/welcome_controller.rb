class WelcomeController < ApplicationController
  #before_action :client
  
  def index
    if params[:building]
      client = SODA::Client.new({:domain => "data.cityofnewyork.us", :app_token => ENV['NYC_OPEN_DATA_API_KEY']})
      @passed = params[:building]
      @response = client.get("b2iz-pps8", {"$limit" => 1, :boroid => 1})
      puts "test"
      puts @response
      puts @response.first.registrationid
    else

    end
    
  end


  # private
  #   def client
  #     client = SODA::Client.new({:domain => "data.cityofnewyork.us", :app_token => ENV['NYC_OPEN_DATA_API_KEY']})
  #   end
  # end
end
