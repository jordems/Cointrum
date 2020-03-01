import { IClassifier } from "../../../models/Classifier";
import Classifier from "../../../models/Classifier";
import { Request, Response } from "express";

export class ClassifierController {
  public getClassifiers(req: Request, res: Response) {
    Classifier.find({}, (err, classifiers) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(classifiers);
    });
  }

  public createClassifier({ body }: Request, res: Response) {
    const newClassifier: IClassifier = new Classifier(body);

    newClassifier.save((err, classifier) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(classifier);
    });
  }

  public getClassifierbyID({ params }: Request, res: Response) {
    Classifier.findById(params.classifierid, (err, classifier) => {
      if (err) {
        res.send(err);
      }
      res.json(classifier);
    });
  }
  public editClassifier({ params, body }: Request, res: Response) {
    Classifier.findByIdAndUpdate(
      params.classifierid,
      body,
      { new: true },
      (err, updatedClassifier) => {
        if (err) {
          res.send(err);
        } else if (updatedClassifier == null) {
          res.json({
            updated: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json(updatedClassifier);
        }
      }
    );
  }

  public removeClassifier({ params }: Request, res: Response) {
    Classifier.findByIdAndRemove(
      params.classifierid,
      (err, removedClassifier) => {
        if (err) {
          res.send(err);
        } else if (removedClassifier == null) {
          res.json({
            removed: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json({ removed: true, message: "Successfully deleted!" });
        }
      }
    );
  }
}
