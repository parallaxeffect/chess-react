# -*- mode: ruby -*-
# vi: set ft=ruby :

guestport = 8080
hostport = 8080

Vagrant.configure(2) do |config|

  config.vm.box = "hashicorp/precise32"

  config.vm.network "forwarded_port", guest: guestport, host: hostport, host_ip: "127.0.0.1"
  
  config.vm.provision "shell" do |s| 
	s.path = './provision.sh'
  
	s.env = { "listen" => guestport }
  end
end
