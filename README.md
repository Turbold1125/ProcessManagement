Query-г postgre бааз дээр уншуулах шаардлагатай доорх query нь тогтмол утгууд болон нэвтрэх хэрэглэгчийн мэдээллийг агуулна

нэвтрэх хэрэглэгч turbold@gmail.com password 123456

Backend code дахь resources/application.properties дотор доорх db connection дахь мэдээллийг агуулна.

spring.application.name=Change

spring.datasource.url=jdbc:postgresql://127.0.0.1:5432/test
spring.datasource.username=postgres
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

jwt.secret=yoursecretkeyafunauifna9epfn031949png912vpbv2
jwt.issuer=processapplication
jwt.expireInMinutes=60

logging.level.root=INFO

logging.level.com.example=DEBUG

logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} ----------------- %msg%n

spring.devtools.livereload.enabled=true
spring.devtools.restart.enabled=true

#server.port=8443
#server.ssl.key-store=classpath:keystore.p12
#server.ssl.key-store-password=12345678
#server.ssl.keyStoreType=PKCS12
#server.ssl.key-alias=newapp

#logging.level.org.springframework=DEBUG


