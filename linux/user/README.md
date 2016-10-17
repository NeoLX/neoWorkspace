#建用户
sudo useradd -m ${用户名} -s /bin/bash
#改密码
sudo passwd ${用户名}
#加超级用户权限
sudo adduser ${用户名} sudo
#删用户
sudo userdel -rf ${用户名}