name := "scala-spark-meetup"

version := "1.0"

scalaVersion := "2.11.11"

ivyScala := ivyScala.value map { _.copy(overrideScalaVersion = true) }

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % "2.1.1",
  "org.apache.spark" %% "spark-streaming" % "2.1.1",
  "org.apache.spark" %% "spark-sql" % "2.1.1",
  "org.twitter4j" % "twitter4j-core" % "4.0.6",
  "org.apache.bahir" %% "spark-streaming-twitter" % "2.1.0",
  "com.algorithmia" %% "algorithmia-scala" % "0.9.2",
  "org.scala-lang.modules" %% "scala-parser-combinators" % "1.0.6"
)
