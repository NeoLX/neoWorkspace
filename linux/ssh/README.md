#生成SSH
ssh localhost

#生成公私钥
ssh-keygen -t rsa

#增加授权
cat ./id_rsa.pub >> ./authorized_keys    