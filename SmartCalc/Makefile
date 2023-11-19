JAR_FILE := target/SmartCalc-0.0.1-SNAPSHOT.jar
CPP_LIB := target/classes/SmartCalc/model.so
REACT_DIR := src/main/view
LIBRARIES_DIR := $(REACT_DIR)/libraries
PUBLIC_DIR := $(REACT_DIR)/public


all: install


jar:
	mvn clean install


copyfromjar: jar
	cp $(JAR_FILE) $(PUBLIC_DIR)
	cp $(JAR_FILE) $(LIBRARIES_DIR)

copycpp:
	cp $(CPP_LIB) $(LIBRARIES_DIR)
	cp $(CPP_LIB) $(PUBLIC_DIR)

install: copyfromjar copycpp runserver
	cd $(REACT_DIR); npm install
	cd $(REACT_DIR); npm run build
	cd $(REACT_DIR); npm run dist

electron: 
	cd $(REACT_DIR); npm install
	cd $(REACT_DIR); npm run build
	cd $(REACT_DIR); npm run electron

runserver:
	mvn spring-boot:run
		
clean:
	mvn clean
	cd $(REACT_DIR); rm -rf dist
	cd $(LIBRARIES_DIR); rm -rf model.so
	cd $(LIBRARIES_DIR); rm -rf SmartCalc-0.0.1-SNAPSHOT.jar
	cd $(PUBLIC_DIR); rm -rf model.so
	rm -rf $(PUBLIC_DIR)/SmartCalc-0.0.1-SNAPSHOT.jar
