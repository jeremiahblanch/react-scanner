export default interface CameraChooserProps {
  devices: MediaDeviceInfo[];
  selectedIndex?: number;
  onSelect: (index: number) => void;
}